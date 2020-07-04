const fs = require("fs");
const tools = require("@iconify/json-tools");
const _ = require("lodash");
const Collection = tools.Collection;

const collection = new Collection();

const category = "carbon";
collection.loadIconifyCollection(category);

const icons = collection.listIcons();

const json = _.map(icons, (icon) => {
  const iconData = collection.getIconData(icon);

  return {
    icon: icon,
    svg: _.get(iconData, "body"),
    width: _.get(iconData, "width"),
    height: _.get(iconData, "height"),
  };
});

function createJSON() {
  const json_in_pages = _.chunk(json, 20);
  const p = require("path");

  _.each(json_in_pages, (page, index) => {
    const pageIndex = index + 1;

    const path = `./collection/${category}/page-${pageIndex}.json`;
    const data = JSON.stringify({
      icons: page,
    });

    fs.writeFile(p.join(__dirname, path), data, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });
}
createJSON();
