import Vue from "vue";
/**
 * ID generator
 */
export const getId = (i => () => i++)(0);

export function getX(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientX
    : e.clientX;
}

export function getY(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientY
    : e.clientY;
}

export const removeElement = el => {
  if (typeof el.remove !== "undefined") {
    el.remove();
  } else {
    el.parentNode.removeChild(el);
  }
};

const isFunction = value => typeof value === "function";

export const isNonEmptyString = value =>
  typeof value === "string" && value.trim().length > 0;

const isObject = value => typeof value === "object";

export const isVueComponent = obj =>
  // Regular Vue instances
  obj instanceof Vue ||
  obj.prototype instanceof Vue ||
  // Object with a render function
  isFunction(obj.render) ||
  // JSX template
  isNonEmptyString(obj.tag) ||
  // Nested object
  isVueComponent(obj.component);

export const isPositiveInt = value => Number.isInteger(value) && value > 0;

export const isString = value => typeof value === "string";

export const isIn = (value, list) => list.indexOf(value) !== -1;

export const getVueComponentFromObj = obj => {
  if (isObject(obj.component)) {
    // Recurse if component prop
    return getVueComponentFromObj(obj.component);
  }
  if (isNonEmptyString(obj.tag)) {
    // Create render function for JSX
    return {
      render() {
        return obj;
      }
    };
  }
  // Return the actual object if regular vue component
  return obj;
};
