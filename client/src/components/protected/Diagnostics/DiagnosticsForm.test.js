import diagnosticReducer, {
  initialState,
} from "../../../reducers/diagnosticReducer";
import * as types from "../../../actions/diagnostic/diagnosticTypes";

describe("diagnostics reducer", () => {
  it("should handle GENERATE_DIAGNOSTICS", () => {
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
  });
});
