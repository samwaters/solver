import { put, select, takeEvery } from '@redux-saga/core/effects'
import { ADD_KNOWN_LETTER, storeKnownLetter } from 'actions/letters.actions'
import { Action } from 'actions/action.interface'
import { getFocussedLetter, getLetterById } from 'selectors/letters.selectors'

function* storeLetter(params: Action) {
    const focus = yield select(getFocussedLetter)
    if (focus.row === -1) return
    const letter = yield select(getLetterById(focus.row, focus.index))
    yield put(
        storeKnownLetter(
            focus.row,
            focus.index,
            params.payload.letter,
            params.payload.valid ?? letter.valid
        )
    )
}

export function* lettersSaga() {
    yield takeEvery(ADD_KNOWN_LETTER, storeLetter)
}
