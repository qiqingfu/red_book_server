/**
 * 提供的验证类, 结合 Strategy 策略类, Validator 充当的是 Context 上下文
 * 会将具体的算法委托给对应的策略类
 */

const Strategy = require("./Strategy");

class Validator {
  constructor() {
    this.caches = [];
  }

  /**
   *
   * xxx.add(123, [{ strategy: "isNotNull", message: "不能为空" }])
   *
   * @param {*} value
   * @param {*} rules
   */
  add(value, rules) {
    if (Array.isArray(rules)) {
      // eslint-disable-next-line no-unused-vars,no-restricted-syntax
      for (const rule of rules) {
        const strategyArr = rule.strategy.split(":");
        const errorMsg = rule.message;

        this.caches.push(() => {
          const strategy = strategyArr.shift(); // 策略函数名
          strategyArr.unshift(value);
          strategyArr.push(errorMsg);

          return Strategy[strategy](...strategyArr);
        });
      }
    } else {
      throw new Error("rules 规则应该是一个数组");
    }
  }

  /**
   * 开始校验
   */
  start() {
    let result = null;
    this.caches.some((fn) => {
      const errMsg = fn.call(this);
      if (errMsg) {
        result = errMsg;
        return true;
      }

      return false;
    });

    return result;
  }

  /**
   * 映射, 通过数组的形式批量注册验证规则
   */
  map(rules, isStart = false) {
    // eslint-disable-next-line no-unused-vars,no-restricted-syntax
    for (const rule of rules) {
      this.add(rule.value, rule.rules);
    }

    if (isStart) {
      return this.start();
    }
    return this;
  }
}

module.exports = Validator;
