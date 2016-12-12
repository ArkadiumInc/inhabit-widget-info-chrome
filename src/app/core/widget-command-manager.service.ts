import {Injectable} from '@angular/core';

@Injectable()
export class WidgetCommandManagerService {

  constructor() {
  }

  getNamespacedEventName(name) {
    return chrome.runtime.id + '-' + name;
  }
}
