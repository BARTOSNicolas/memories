import { reactive } from "vue";

const state = reactive({
    difficult: 12,
    cells: [],
    verify: [],
    clickToWin: 0,
    click: true,
    isWin: false
});

export default { state: state };

