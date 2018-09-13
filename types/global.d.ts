/// <reference types="node" />

import Runtime from "allure-js-commons/runtime"
type Runtime = typeof Runtime

declare global {
	namespace NodeJS  {
		interface Global {
			allure: Runtime // does not work, just any
			onError(err: Error): void
		}
	}
}

export { allure, global }