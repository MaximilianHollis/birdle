import {
  /*   put,
   */ takeEvery,
  /*   takeLatest,
   */ all,
  /*   delay,
  take,
  fork,
  call,
  spawn, */
} from 'redux-saga/effects'

export default function* rootSaga(_state: any) {
  /*   const sagas = []
   */
  yield all(
    yield takeEvery('input', (e) => console.log(e))
    /* sagas.map((saga) =>
        spawn(function* () {
          while (true) {
            try {
              yield call(saga, state)
              break
            } catch (e) {
              console.log(e)
            }
          }
        }) */
  )
}
