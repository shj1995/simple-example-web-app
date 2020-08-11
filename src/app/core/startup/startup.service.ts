import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
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
          // Application data
          // const res: any = appData;
          // Application information: including site name, description, year
          this.settingService.setApp(appData);
          // User information: including name, avatar, email address
          this.settingService.setUser(userData);
          // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
          this.aclService.setFull(true);
          // Menu data, https://ng-alain.com/theme/menu
          // this.menuService.add(res.menu);
          // Can be set page suffix title, https://ng-alain.com/theme/title
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
