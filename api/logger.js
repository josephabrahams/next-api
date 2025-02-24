import morgan, { compile } from "morgan";

const COLORS = {
  none: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function headersSent(res) {
  return typeof res.headersSent !== "boolean"
    ? Boolean(res._header)
    : res.headersSent;
}

function formatResponseTime(responseTimeStr) {
  const responseTime = parseFloat(responseTimeStr);
  if (responseTime < 10) return responseTime.toPrecision(2);
  return Math.round(responseTime);
}

const dev = process.env.NODE_ENV !== "production";

const logger = () => {
  if (!dev) return (req, res, next) => next();

  return morgan(function nextFormatLine(tokens, req, res) {
    var status = headersSent(res) ? res.statusCode : undefined;

    var color =
      status >= 500
        ? "red"
        : status >= 400
        ? "yellow"
        : status >= 300
        ? "cyan"
        : status >= 200
        ? "green"
        : "none";

    var fn = nextFormatLine[color];

    if (!fn) {
      const methodFn = compile(":method");
      const urlFn = compile(":url");
      const statusFn = compile(":status");
      const responseTimeFn = compile(":response-time");

      fn = nextFormatLine[color] = (tokens, req, res) => {
        const method = methodFn(tokens, req, res);
        const url = urlFn(tokens, req, res);
        const status = COLORS[color] + statusFn(tokens, req, res) + COLORS["none"];
        const responseTime = formatResponseTime(
          responseTimeFn(tokens, req, res)
        );

        return ` ${method} ${url} ${status} in ${responseTime}ms`;
      };
    }

    return fn(tokens, req, res);
  });
};

export default logger;
