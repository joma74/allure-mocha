export {}

import RuntimeType = require("allure-js-commons/runtime")
type RuntimeType = typeof RuntimeType

declare global {
	var allure: RuntimeType
}