import { Component } from "@utils/Component";
import { PHONE_CAMERA_WIDTH, PHONE_CAMERA_HEIGHT } from "@constants/sketchSizes";
import { updateFilters } from "./updateFilters";
import { FILTER_PARENT_ID } from "@constants/sketchSelectors";
import * as fx from "glfx-es6";

const DEFAULT_UPDATE_DELAY = 500;

const FilterWindow = () => {
    return Component({
        html: /*html*/ `
      <div class="filters-preview" id="${FILTER_PARENT_ID}">
        <h4 class="header h4-header filters-preview__header">Формат 4:3 с фильтрами</h4>
        <canvas class="filters-preview__canvas"></canvas>
      </div>
    `,
        setup: function() {
            const wrapper = this;
            const filterData = {};

            filterData.canvas  = wrapper.querySelector("canvas");
            filterData.ctx2d   = filterData.canvas.getContext("2d");

            filterData.canvas.width  = PHONE_CAMERA_WIDTH;
            filterData.canvas.height = PHONE_CAMERA_HEIGHT;

            // FX canvas для фильтров
            filterData.fxCanvas = fx.canvas();
            filterData.fxCanvas.width  = PHONE_CAMERA_WIDTH;
            filterData.fxCanvas.height = PHONE_CAMERA_HEIGHT;

            const filterController = {
                looped: false,
                intervalId: null,
                startLoop: (ms = DEFAULT_UPDATE_DELAY, filterOptions) => {
                    if(filterController.intervalId){
                        filterController.stopLoop();
                    }

                    filterController.looped = true;
                    filterController.intervalId = setInterval(() => filterController.update(filterOptions), ms);
                },
                stopLoop: () => {
                    filterController.looped = false;
                    clearInterval(filterController.intervalId);
                },
                update: (filterOptions) => {
                    updateFilters.call(filterData, filterOptions);
                },
                canvas: filterData.canvas
            };

            this.filterController = filterController;
        }
    });
};

export default FilterWindow;
