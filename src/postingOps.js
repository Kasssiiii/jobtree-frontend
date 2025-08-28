export const postOps = (state, op) => {
    switch (op.action) {
        case 'set':
            return op.postings;
            case 'add':
                return [op.posting, ...state];
            case 'setStage':
                return state.map(post =>
                    post._id === op._id ? { ...post, stage: op.stage, lastStageChange: op.lastStageChange } : post
                );
            case 'remove':
                return state.filter(post => post._id !== op._id);
            default:
                return state;
        }
    };