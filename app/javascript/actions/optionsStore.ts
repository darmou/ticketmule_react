import produce from "immer";
import { getPlural } from "../utils/network";
import { OptionTypes, OptionType, State } from "../types/types";

interface AddOptionInterface {
    state: State,
    type: OptionType,
    anOption: OptionTypes
}

const OptionsStore = {
    addOption: function ({state, type, anOption}: AddOptionInterface) {
        const plural = getPlural(type);
        return produce(state, draftState => {
            draftState.options[plural].push(anOption);
        });
    },
    updateOption: function ({state, type, anOption}) {
        const plural = getPlural(type);
        if (state && state.options[plural]) {
            const index = state.options[plural].findIndex(option => option.id === anOption.id);
            return produce(state, draftState => {
                draftState.options[plural][index] = {...draftState.options.groups[index], ...anOption};
            });
        }
        return state;
    },
};

export default OptionsStore;