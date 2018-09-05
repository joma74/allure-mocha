import Runtime from "allure-js-commons/runtime";

declare global {
	namespace NodeJS  {
		interface Global {
			allure: typeof Runtime
			onError(err: Error): void
		}
	}
}

export { }