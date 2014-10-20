define (require, exports, module) ->

    'use strict'
    Utils = require('lib/utils')

    describe 'Utils', ->
        it 'isType', ->
            expect(Utils.isType(new Object(),"object")).toBe(true)
            expect(Utils.isType(new String("abc"),"object")).toBe(false)

        it 'isObject', ->
            expect(Utils.isObject(new Object())).toBe(true)
            expect(Utils.isObject({})).toBe(true)
            expect(Utils.isObject(new String("abc"))).toBe(false)
            expect(Utils.isObject("abc")).toBe(false)
            expect(Utils.isObject(new Number(123))).toBe(false)
            expect(Utils.isObject(123)).toBe(false)
            expect(Utils.isObject(new Array())).toBe(false)
            expect(Utils.isObject([])).toBe(false)
            expect(Utils.isObject(->)).toBe(false)
            expect(Utils.isObject(new RegExp("abc"))).toBe(false)
            expect(Utils.isObject(/abc/)).toBe(false)
        it 'isString', ->
            expect(Utils.isString(new Object())).toBe(false)
            expect(Utils.isString({})).toBe(false)
            expect(Utils.isString(new String("abc"))).toBe(true)
            expect(Utils.isString("abc")).toBe(true)
            expect(Utils.isString(new Number(123))).toBe(false)
            expect(Utils.isString(123)).toBe(false)
            expect(Utils.isString(new Array())).toBe(false)
            expect(Utils.isString([])).toBe(false)
            expect(Utils.isString(->)).toBe(false)
            expect(Utils.isString(new RegExp("abc"))).toBe(false)
            expect(Utils.isString(/abc/)).toBe(false)
        it 'isNumber', ->
            expect(Utils.isNumber(new Object())).toBe(false)
            expect(Utils.isNumber({})).toBe(false)
            expect(Utils.isNumber(new String("abc"))).toBe(false)
            expect(Utils.isNumber("abc")).toBe(false)
            expect(Utils.isNumber(new Number(123))).toBe(true)
            expect(Utils.isNumber(123)).toBe(true)
            expect(Utils.isNumber(new Array())).toBe(false)
            expect(Utils.isNumber([])).toBe(false)
            expect(Utils.isNumber(->)).toBe(false)
            expect(Utils.isNumber(new RegExp("abc"))).toBe(false)
            expect(Utils.isNumber(/abc/)).toBe(false)
        it 'isArray', ->
            expect(Utils.isArray(new Object())).toBe(false)
            expect(Utils.isArray({})).toBe(false)
            expect(Utils.isArray(new String("abc"))).toBe(false)
            expect(Utils.isArray("abc")).toBe(false)
            expect(Utils.isArray(new Number(123))).toBe(false)
            expect(Utils.isArray(123)).toBe(false)
            expect(Utils.isArray(new Array())).toBe(true)
            expect(Utils.isArray([])).toBe(true)
            expect(Utils.isArray(->)).toBe(false)
            expect(Utils.isArray(new RegExp("abc"))).toBe(false)
            expect(Utils.isArray(/abc/)).toBe(false)
        it 'isFunction', ->
            expect(Utils.isFunction(new Object())).toBe(false)
            expect(Utils.isFunction({})).toBe(false)
            expect(Utils.isFunction(new String("abc"))).toBe(false)
            expect(Utils.isFunction("abc")).toBe(false)
            expect(Utils.isFunction(new Number(123))).toBe(false)
            expect(Utils.isFunction(123)).toBe(false)
            expect(Utils.isFunction(new Array())).toBe(false)
            expect(Utils.isFunction([])).toBe(false)
            expect(Utils.isFunction(->)).toBe(true)
            expect(Utils.isFunction(new RegExp("abc"))).toBe(false)
            expect(Utils.isFunction(/abc/)).toBe(false)
        it 'isRegex', ->
            expect(Utils.isRegex(new Object())).toBe(false)
            expect(Utils.isRegex({})).toBe(false)
            expect(Utils.isRegex(new String("abc"))).toBe(false)
            expect(Utils.isRegex("abc")).toBe(false)
            expect(Utils.isRegex(new Number(123))).toBe(false)
            expect(Utils.isRegex(123)).toBe(false)
            expect(Utils.isRegex(new Array())).toBe(false)
            expect(Utils.isRegex([])).toBe(false)
            expect(Utils.isRegex(->)).toBe(false)
            expect(Utils.isRegex(new RegExp("abc"))).toBe(true)
            expect(Utils.isRegex(/abc/)).toBe(true)
        it 'parse', ->
            expect(Utils.parse()).toEqual([])
            expect(Utils.parse('[{"a":1}]')).toEqual([{a:1}])
            expect(Utils.parse('[1,2,3]')).toEqual([1,2,3])
        it 'stringify', ->
            expect(Utils.stringify()).toEqual('[]')
            expect(Utils.stringify([{a:1}])).toEqual('[{"a":1}]')
            expect(Utils.stringify([1,2,3])).toEqual('[1,2,3]')
        it 'isEqual', ->
            expect(Utils.isEqual('aaa','bbb')).toBe(false)
            expect(Utils.isEqual('aaa','aaa')).toBe(true)
            expect(Utils.isEqual(1,2)).toBe(false)
            expect(Utils.isEqual(1,1)).toBe(true)
            expect(Utils.isEqual(0,1)).toBe(false)
            expect(Utils.isEqual(new Date(2014,9,26),new Date(2014,9,26))).toBe(true)
            expect(Utils.isEqual(new Date(2014,9,27),new Date(2014,9,26))).toBe(false)
            expect(Utils.isEqual(true,true)).toBe(true)
            expect(Utils.isEqual(true,false)).toBe(false)
            expect(Utils.isEqual(null,undefined)).toBe(false)
            expect(Utils.isEqual(undefined,null)).toBe(false)
            expect(Utils.isEqual(NaN,1)).toBe(false)
        it 'keys', ->
            expect(Utils.keys([])).toEqual([])




