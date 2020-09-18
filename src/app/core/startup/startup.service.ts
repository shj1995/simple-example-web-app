import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ReuseTabService } from '@delon/abc';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector,
    private reuseTabService: ReuseTabService,
    private router: Router
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    const tokenData = this.tokenService.get();
    if (!tokenData.token) {
      this.injector.get(Router).navigateByUrl('/passport/login');
      resolve({});
      return;
    }
    console.log(this.router.url);
    console.log(window.location.href);
    console.log(window.location.pathname);
    let menusUrl = '/tk/menus/workbench';
    if(window.location.pathname.startsWith("/admin")){
      menusUrl = '/tk/menus/admin';
    }

    zip(this.httpClient.get('/tk/systemInfo/current'), this.httpClient.get('/us/users/current'), this.httpClient.get(menusUrl))
      .pipe(
        catchError(([appData, userData, menuData]) => {
          resolve(null);
          return [appData, userData, menuData];
        }),
      )
      .subscribe(
        ([appData, userData, menuData]) => {
          this.settingService.setApp(appData);
          userData.avatar = `/api/tk/files/${userData.avatar}/view`;
          userData.name = userData.nickname;
          this.settingService.setUser(userData);
          this.aclService.setFull(true);
          this.titleService.suffix = appData.name;
          this.menuService.add(menuData[0].children);
        },
        () => {},
        () => {
          resolve(null);
        },
      );
  }
  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      this.reuseTabService.mode = 2;
      this.reuseTabService.excludes = [new RegExp('^/passport'), new RegExp('^/exception'), new RegExp('^exception')];
    });
  }
}
