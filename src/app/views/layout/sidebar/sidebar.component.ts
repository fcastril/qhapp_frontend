import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  Inject,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";

import MetisMenu from "metismenujs/dist/metismenujs";

import { MENU } from "./menu";
import { MenuItem } from "./menu.model";
import { Router, NavigationEnd } from "@angular/router";
import { ApiService } from "../../../services/api.service";
import { TypeAgendaModel } from "../../../models/type-agenda.model";
import { ProfileOptionModel } from "src/app/models/profileOption.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild("sidebarToggler") sidebarToggler: ElementRef;

  menuItems = [];
  calendars = [];
  @ViewChild("sidebarMenu") sidebarMenu: ElementRef;
  theme: string;

  regs: TypeAgendaModel[] = [];
  item;
  regsOptions: ProfileOptionModel[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    router: Router,
    private api: ApiService
  ) {
    let idProfile: number = Number(localStorage.getItem("idProfile"));

    this.api
      .getProfileOption(idProfile)
      .subscribe((resp: ProfileOptionModel[]) => {
        this.regsOptions = resp;
        this.asignarMenu();
        console.log("menu:", this.menuItems);
      });
    // construcción de memú agendas dinamicas
    this.api.get("TypesAgenda").subscribe((resp: any) => {
      this.regs = resp;
      this.item = {
        label: "Agenda General",
        link: "/schedules-general",
      };
      this.calendars.push(this.item);
      let i = 0;
      this.regs.forEach((element) => {
        this.item = {
          label: "Agenda " + element.typeAgenda,
          link: "/schedules/" + element.idTypeAgenda,
        };
        this.calendars.push(this.item);
        i++;
      });
    });
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();

        /**
         * closing the sidebar
         */
        // if (window.matchMedia('(max-width: 991px)').matches) {
        //   this.document.body.classList.remove('sidebar-open');
        // }
      }
    });
  }

  ngOnInit(): void {
    this.theme = localStorage.getItem("theme");
    /**
     * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
     */
    const desktopMedium = window.matchMedia(
      "(min-width:992px) and (max-width: 1199px)"
    );
    desktopMedium.addListener(this.iconSidebar);
    this.iconSidebar(desktopMedium);

    // Organizar el Theme
    this.document.body.classList.remove("sidebar-light", "sidebar-dark");
    this.document.body.classList.add(localStorage.getItem("theme"));
  }
  asignarMenu() {
    this.menuItems = MENU;
    this.menuItems.forEach((menu: MenuItem) => {
      menu.access = this.GetPermission(menu.id);
      if (menu.subItems?.length > 0) {
        menu.subItems.forEach((subitem: MenuItem) => {
          subitem.access = this.GetPermission(subitem.id);
          if (subitem.subItems?.length > 0) {
            subitem.subItems.forEach((subSubitem: MenuItem) => {
              subSubitem.access = this.GetPermission(subSubitem.id);
            });
          }
        });
      }
    });
    this.resetMenuItems();
    this.activateMenuItems();
  }
  ngAfterViewInit() {
    // activate menu item
    new MetisMenu(this.sidebarMenu.nativeElement);

    this._activateMenuDropdown();
  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e) {
    this.sidebarToggler.nativeElement.classList.toggle("active");
    this.sidebarToggler.nativeElement.classList.toggle("not-active");
    if (window.matchMedia("(min-width: 992px)").matches) {
      e.preventDefault();
      this.document.body.classList.toggle("sidebar-folded");
    } else if (window.matchMedia("(max-width: 991px)").matches) {
      e.preventDefault();
      this.document.body.classList.toggle("sidebar-open");
    }
  }

  /**
   * Toggle settings-sidebar
   */
  toggleSettingsSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle("settings-open");
  }

  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains("sidebar-folded")) {
      this.document.body.classList.add("open-sidebar-folded");
    }
  }

  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains("sidebar-folded")) {
      this.document.body.classList.remove("open-sidebar-folded");
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(e) {
    if (e.matches) {
      this.document.body.classList.add("sidebar-folded");
    } else {
      this.document.body.classList.remove("sidebar-folded");
    }
  }

  /**
   * Switching sidebar light/dark
   */
  onSidebarThemeChange(event) {
    this.document.body.classList.remove("sidebar-light", "sidebar-dark");
    this.document.body.classList.add(event.target.value);
    this.document.body.classList.remove("settings-open");
    localStorage.setItem("theme", event.target.value);
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  /**
   * Resets the menus
   */
  resetMenuItems() {
    const links = document.getElementsByClassName("nav-link-ref");

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove("mm-active");
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.remove("mm-active");
        const parent2El = parentEl.parentElement;

        if (parent2El) {
          parent2El.classList.remove("mm-show");
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.remove("mm-active");

          if (parent3El.classList.contains("side-nav-item")) {
            const firstAnchor = parent3El.querySelector(".side-nav-link-a-ref");

            if (firstAnchor) {
              firstAnchor.classList.remove("mm-active");
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.remove("mm-show");

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.remove("mm-active");
            }
          }
        }
      }
    }
  }

  /**
   * Toggles the menu items
   */
  activateMenuItems() {
    const links = document.getElementsByClassName("nav-link-ref");
    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]["pathname"]) {
        menuItemEl = links[i];

        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add("mm-active");
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.add("mm-active");

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add("mm-show");
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add("mm-active");

          if (parent3El.classList.contains("side-nav-item")) {
            const firstAnchor = parent3El.querySelector(".side-nav-link-a-ref");

            if (firstAnchor) {
              firstAnchor.classList.add("mm-active");
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.add("mm-show");

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.add("mm-active");
            }
          }
        }
      }
    }
  }

  GetPermission(option: string) {
    let obj: ProfileOptionModel = this.regsOptions.find(
      (x) => x.codeOption == option
    );
    if (obj != null) {
      return obj.access;
    }
    return false;
  }
}
