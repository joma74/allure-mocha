/// <reference types="node" />

export = global;

import Runtime from "allure-js-commons/runtime"

declare global {
	namespace NodeJS  {
		interface Global {
			allure: Runtime
			onError(err: Error): void
		}
	}
}

export { }