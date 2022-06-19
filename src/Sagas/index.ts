import { put, takeLatest } from 'redux-saga/effects'


export function* helloSaga() {
    console.log('Hello Sagas!')
  }

  export default function* rootSaga() {
    yield takeLatest('HELLO_SAGA', helloSaga)
  }