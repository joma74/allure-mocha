/// <reference types="node" />

export = global;

import Runtime from "allure-js-commons/runtime"

declare global {
	namespace NodeJS  {
		interface Global {
			allure: Runtime // does not work, just any
			onError(err: Error): void
		}
	}
}

export { }