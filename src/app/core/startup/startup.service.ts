import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

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
    private injector: Injector
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
    zip(
      this.httpClient.get('/tk/systemInfo'),
      this.httpClient.get('/us/users/current'),
      this.httpClient.get('/tk/menus')
    ).pipe(
      catchError(([appData, userData, menuData]) => {
        resolve(null);
        return [appData, userData, menuData];
      })
    ).subscribe(([appData, userData, menuData]) => {

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
      // this.menuService.add([
      //   {
      //     text: '系统监控',
      //     link: '/dashboard',
      //     icon: { type: 'icon', value: 'rocket' },
      //     shortcutRoot: true
      //   },
      //   {
      //     text: '智能开发',
      //     group: true,
      //     children: [
      //       {
      //         text: '模块管理',
      //         link: '/dashboard',
      //         icon: { type: 'icon', value: 'rocket' },
      //         shortcutRoot: true
      //       },
      //       {
      //         text: '模型管理',
      //         link: '/dashboard',
      //         icon: { type: 'icon', value: 'rocket' },
      //         shortcutRoot: true
      //       },
      //       {
      //         text: '计划任务',
      //         link: '/dashboard',
      //         icon: { type: 'icon', value: 'rocket' },
      //         shortcutRoot: true
      //       },
      //       {
      //         text: '侦听器',
      //         link: '/datamodel/listener',
      //         icon: { type: 'icon', value: 'rocket' },
      //         shortcutRoot: true
      //       }
      //     ]
      //   },
      //   {
      //     text: '系统设置',
      //     group: true,
      //     children: [
      //       {
      //         text: '菜单管理',
      //         link: '/dashboard',
      //         icon: { type: 'icon', value: 'rocket' },
      //         shortcutRoot: true
      //       },
      //       {
      //         text: '系统配置',
      //         link: '/dashboard',
      //         icon: { type: 'icon', value: 'rocket' },
      //         shortcutRoot: true
      //       }
      //     ]

      //   },

      //   {
      //     text: '用户模块',
      //     group: true,
      //     children: [
      //       {
      //         text: '用户管理',
      //         link: '/usersystem/user-list',
      //         icon: { type: 'icon', value: 'appstore' }
      //       },
      //       {
      //         text: '角色管理',
      //         link: '/dashboard',
      //         icon: { type: 'icon', value: 'appstore' }
      //       }
      //     ]
      //   },
      //   {
      //     text: '异常页',
      //     group: true,
      //     children: [
      //       {
      //         text: '404',
      //         link: '/exception/404',
      //         icon: { type: 'icon', value: 'appstore' }
      //       },
      //     ]
      //   }
      // ]);

      this.menuService.add(menuData[0].children);

      // this.menuService.add([
      //   {
      //     text: '异常页',
      //     group: true,
      //     children: [
      //       {
      //         text: '404',
      //         link: '/exception/404',
      //         icon: { type: 'icon', value: 'appstore' }
      //       },
      //     ]
      //   }
      // ]);

    },
      () => { },
      () => {
        resolve(null);
      });
  }

  // private viaMock(resolve: any, reject: any) {
  //   const tokenData = this.tokenService.get();
  //   if (!tokenData.token) {
  //     this.injector.get(Router).navigateByUrl('/passport/login');
  //     resolve({});
  //     return;
  //   }
  //   // mock
  //   const app: any = {
  //     name: `ng-alain`,
  //     description: `Ng-zorro admin panel front-end framework`
  //   };
  //   const user: any = {
  //     name: 'Admin',
  //     avatar: './assets/tmp/img/avatar.jpg',
  //     email: 'cipchk@qq.com',
  //     token: '123456789'
  //   };
  //   // Application information: including site name, description, year
  //   this.settingService.setApp(app);
  //   // User information: including name, avatar, email address
  //   this.settingService.setUser(user);
  //   // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
  //   this.aclService.setFull(true);
  //   // Menu data, https://ng-alain.com/theme/menu
  //   this.menuService.add([
  //     {
  //       text: 'Main',
  //       group: true,
  //       children: [
  //         {
  //           text: 'Dashboard',
  //           link: '/dashboard',
  //           icon: { type: 'icon', value: 'appstore' }
  //         },
  //         {
  //           text: 'Quick Menu',
  //           icon: { type: 'icon', value: 'rocket' },
  //           shortcutRoot: true
  //         }
  //       ]
  //     }
  //   ]);
  //   // Can be set page suffix title, https://ng-alain.com/theme/title
  //   this.titleService.suffix = app.name;

  //   resolve({});
  // }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMock(resolve, reject);
    });
  }
}
