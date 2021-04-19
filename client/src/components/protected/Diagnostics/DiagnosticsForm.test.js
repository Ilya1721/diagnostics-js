import diagnosticReducer, {
  initialState,
} from "../../../reducers/diagnosticReducer";
import * as types from "../../../actions/diagnostic/diagnosticTypes";
import * as actions from "../../../actions/diagnostic/diagnosticActions";

describe("diagnostics reducer", () => {
  /*it("should handle GENERATE_DIAGNOSTICS", () => {
    const action = {
      type: types.GENERATE_DIAGNOSTICS,
      payload: {
        diagnosis: [
          { id: 1, name: "авітаміноз" },
          { id: 2, name: "анемія" },
          { id: 6, name: "грип" },
        ],
      },
    };

    expect(diagnosticReducer(initialState, action)).toEqual({
      diagnostic: action.payload,
      innerData: [],
      loading: false,
    });
  });*/

  it("should handle GET_DIAGNOSTICS", () => {
    const action = {
      type: types.GET_DIAGNOSTICS,
      payload: {
        diagnosis: [
          {
            diagnos: { id: 1, name: "авітаміноз" },
            symptoms: [
              { id: 1, name: "Кашель" },
              { id: 2, name: "Тошнота" },
            ],
          },
        ],
      },
    };

    expect(diagnosticReducer(initialState, action)).toEqual({
      diagnostic: {
        diagnosis: [],
      },
      innerData: action.payload,
      loading: false,
    });
  });
});
