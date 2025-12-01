import chalk from "chalk";

export function logMessage(message: string) {
    console.log(chalk.white(message));
}

export function logWarning(message: string) {
    console.warn(chalk.yellow(message));
}

export function logInfo(message: string) {
    console.info(chalk.green(message));
}

export function logError(message: string) {
    console.error(chalk.red(message));
}

export function logDebug(message: string) {
    console.debug(chalk.blue(message));
}