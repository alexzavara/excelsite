import {Page} from '../core/Page';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';
import {createStore} from '../core/createStore';
import {rootReducer} from '../components/redux/rootReducer';
import {storage, debounce} from '../core/utils';
import {normaliseInitialState} from '../components/redux/initialState';

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()

    const state = storage(storageName(params));
    // Инструмент для обновления state приложения
    const store = createStore(rootReducer, normaliseInitialState(state));
    const stateListener = debounce(state => {
      console.log(state);
      storage(storageName(params), state);
    }, 300)

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
