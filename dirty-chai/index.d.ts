/**
 * Typings for dirty-chai and sinon-chai
 * @author Nick Wronski <https://github.com/nwronski>
 * @note
 *   There are no typings available for dirty-chai, and sinon-chai when it is used with dirty-chai,
 *   so this file contains the correct typings when using these two Chai plugins.
 * 
 *   https://gist.github.com/nwronski/9bf443a61a4c310675a91da8bb635384
 */
declare namespace Chai {
	/* tslint:disable-next-line:interface-name */
	export interface LanguageChains {
	  always: Assertion;
	}
  
	/* tslint:disable-next-line:interface-name */
	export interface Assertion {
	  /**
	   * @note
	   *   This is required because you cannot redeclare the type of previously-declared property on an interface.
	   *   The correct types are included for the existing Chai assertion properties we are overwriting, for the
	   *   sake of completeness, but they are ignored by the TypeScript compiler.
	   * @see {@link https://stackoverflow.com/a/41286276}
	   */
	  (message?: string): Assertion;
  
	  // From: chai
	  ok(message?: string): Assertion;
	  true(message?: string): Assertion;
	  false(message?: string): Assertion;
	  null(message?: string): Assertion;
	  undefined(message?: string): Assertion;
	  NaN(message?: string): Assertion;
	  finite(message?: string): Assertion;
	  itself(message?: string): Assertion;
	  extensible(message?: string): Assertion;
	  sealed(message?: string): Assertion;
	  frozen(message?: string): Assertion;
  
	  // From: sinon-chai
	  called(message?: string): Assertion;
	  calledOnce(message?: string): Assertion;
	  calledTwice(message?: string): Assertion;
	  calledThrice(message?: string): Assertion;
	  calledWithNew(message?: string): Assertion;
  
	  callCount(count: number): Assertion;
	  calledBefore(anotherSpy: any): Assertion;
	  calledAfter(anotherSpy: any): Assertion;
	  calledOn(context: any): Assertion;
	  calledWith(...args: any[]): Assertion;
	  calledWithExactly(...args: any[]): Assertion;
	  calledWithMatch(...args: any[]): Assertion;
	  returned(obj: any): Assertion;
	  thrown(obj?: Error | typeof Error | string): Assertion;
	}
  }
  
  declare module 'dirty-chai' {
	function dirtyChai(chai: any, utils: any): void;
	namespace dirtyChai { }
	export = dirtyChai;
  }
  
  declare module 'sinon-chai' {
	function sinonChai(chai: any, utils: any): void;
	namespace sinonChai { }
	export = sinonChai;
  }