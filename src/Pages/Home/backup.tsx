const navigateRail = (direction) => {
  // copy the components
  let local = [...components];

  // create local component
  let component = { ...local[focus.component] };
  let { current_item, content, left, type, sub_type } = component;

  let active = current_item;

  // update component
  content[current_item].state = "default";

  // handle conditionals for component type(s)
  if (type === "grid") {
    if (direction === "forward") {
      let row = current_row + 1;
      let max = row * 6 - 1;
      active =
        active >= content.length - 1
          ? content.length - 1
          : updateValue(active, max, direction);
    } else {
      let lowVal = 6 * current_row;
      // if first item in row, open menu
      if (active === current_row * 6) {
        globalFocus();
      } else {
        active = active - 1 > lowVal - 1 ? active - 1 : active;
      }
    }

    // update new
    content[active].state =
      direction === "back" && current_item === current_row * 6
        ? "previous"
        : "focus";

    component = {
      ...component,
      current_item: active
    };
  }

  if (type === "navigation" || type === "rail") {
    // update new
    let active = updateValue(current_item, content.length - 1, direction);
    content[active].state = "focus";
    component.left = translateLeft(component, active, component.sub_type);

    if (direction === "back" && current_item === 0) {
      content[active].state = "previous";
      globalFocus();
    }

    // update component
    component = {
      ...component,
      current_item: active
    };
  }

  // replace component
  local.splice(focus.component, 1, component);
  setComponents([...local]);
  setCurrentComponent(component);
};
const updatePreviousComponent = () => {
  let component = { ...components[focus.component] };
  let { current_item, content, name, type } = component;
  let { item } = focus;

  if (type === "rail") {
    content[current_item].state = "previous";
  }

  if (type === "navigation") {
    content[current_item].state = "active";
  }

  setPreviousComponent(focus);
};

const translateY = () => {
  let val = verticalOffsets[focus.component];
  return val;
};
