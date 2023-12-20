export enum Color {
  GRAY = '\x1b[90m',
  WHITE = '\x1b[37m',
  RED = '\x1b[31m',
  YELLOW = '\x1b[33m',
  BLUE = '\x1b[34m',
}

function prefix() {
  const currentDate = new Date().toLocaleString();

  return `${Color.GRAY}[${currentDate}]${Color.WHITE}`;
}

function error(service: string, error: Error | unknown) {
  console.log(
    `${prefix()} ${Color.RED}${service}:error ${Color.WHITE}${
      error instanceof Error ? error.message : error
    }`,
  );
}

function warning(service: string, message: string) {
  console.log(
    `${prefix()} ${Color.YELLOW}${service}:warn ${Color.WHITE}${message}`,
  );
}

function log(service: string, message: any) {
  console.log(`${prefix()} ${Color.BLUE}${service} ${Color.WHITE}${message}`);
}

export const Logger = { error, warning, log };
