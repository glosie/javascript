import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  NotSmallTopbar,
  NotSmallRoute,
  SmallTopbar,
  SmallRoute,
  DisplaySwitch,
  BellIcon,
  XIcon,
  SpyglassIcon,
  PlatformNotificationsBar,
  PlatformNotificationsProvider,
  PlatformNotification,
  PlatformNotificationsStyle
  // AppsProvider,
  // ConnectedPeopleProvider
} from "../index";

const shared = {
  appName: "Giving",
  env: "development",
  style: {
    zIndex: 1
  },
  colors: {
    base0: "#F4C551",
    base1: "#E4A93A",
    base2: "#C47F15",
    base3: "#8E5804"
  }
  // colors: { // People
  //   base0: "#5781CF",
  //   base1: "#3F70CB",
  //   base2: "#3063BF",
  //   base3: "#184595"
  // },
  // colors: { // Services
  //   base0: "#6A9639",
  //   base1: "#55861F",
  //   base2: "#487813",
  //   base3: "#376109"
  // }
};

const staticPlatformNotifications = {
  "1": {
    html: "<strong>PCO Rocks!</strong>",
    enabled: "true"
  },
  texas: {
    html: "<strong>I won't be here long!</strong>",
    enabled: "true",
    expires_at: "2018-02-28T19:02:13Z"
  },
  other: {
    html:
      "Just testing some things... <em>I won't be here long!</em>: <a href='#'>click this</a>",
    enabled: "true",
    expires_at: "2018-02-28T19:02:13Z"
  }
};

const staticData = {
  routes: [["people", "#"], ["some", "#"], ["other", "#"]],
  activeRoute: "people"
};

const apps = [
  {
    type: "App",
    id: "1",
    attributes: { name: "Accounts", url: "http://accounts.pco.test" },
    links: { self: "http://api.pco.test/people/v2/apps/1" }
  },
  {
    type: "App",
    id: "3",
    attributes: { name: "People", url: "http://people.pco.test" },
    links: { self: "http://api.pco.test/people/v2/apps/3" }
  },
  {
    type: "App",
    id: "4",
    attributes: { name: "Check-Ins", url: "http://check-ins.pco.test" },
    links: { self: "http://api.pco.test/people/v2/apps/4" }
  },
  {
    type: "App",
    id: "5",
    attributes: { name: "Giving", url: "http://giving.pco.test" },
    links: { self: "http://api.pco.test/people/v2/apps/5" }
  },
  {
    type: "App",
    id: "6",
    attributes: { name: "Groups", url: "http://groups.pco.test" },
    links: { self: "http://api.pco.test/people/v2/apps/6" }
  },
  {
    type: "App",
    id: "7",
    attributes: { name: "Registrations", url: "http://registrations.pco.test" },
    links: { self: "http://api.pco.test/people/v2/apps/7" }
  },
  {
    type: "App",
    id: "8",
    attributes: { name: "Resources", url: "http://resources.pco.test" },
    links: { self: "http://api.pco.test/people/v2/apps/8" }
  },
  {
    type: "App",
    id: "9",
    attributes: { name: "Services", url: "http://services.pco.test" },
    links: { self: "http://api.pco.test/people/v2/apps/9" }
  }
];

const asyncData = {
  apps: [
    {
      attributes: {
        name: "check-ins",
        url: "#"
      }
    },
    {
      attributes: {
        name: "groups",
        url: "#"
      }
    },
    {
      attributes: {
        name: "resources",
        url: "#"
      }
    },
    {
      attributes: {
        name: "accounts",
        url: "#"
      }
    },
    {
      attributes: {
        name: "giving",
        url: "#"
      }
    },
    {
      attributes: {
        name: "services",
        url: "#"
      }
    },
    {
      attributes: {
        name: "people",
        url: "#"
      }
    },
    {
      attributes: {
        name: "registrations",
        url: "#"
      }
    }
  ],
  connectedPeople: [
    {
      id: 1,
      attributes: {
        organization_name: "W Church"
      }
    },
    {
      id: 2,
      attributes: {
        organization_name: "A Church"
      }
    },
    {
      id: 3,
      attributes: {
        organization_name:
          "National Federation of Coffee National Federation of Coffee National Federation of Coffee"
      }
    },
    {
      id: 4,
      attributes: {
        organization_name: "Z Church"
      }
    },
    {
      id: 5,
      attributes: {
        organization_name: "C Church"
      }
    }
  ]
};

class StaticConnectedPeopleProvider extends React.Component<
  {
    render: any;
  },
  {}
> {
  mockConnectedPeopleFetch() {
    setTimeout(() => {
      window.localStorage.setItem(
        "Topbar:ConnectedPeople",
        JSON.stringify(asyncData.connectedPeople)
      );
      return this.forceUpdate();
    }, 1000);
  }

  componentDidMount() {
    if (!JSON.parse(window.localStorage.getItem("Topbar:ConnectedPeople"))) {
      this.mockConnectedPeopleFetch();
    }
  }

  render() {
    return this.props.render(
      JSON.parse(window.localStorage.getItem("Topbar:ConnectedPeople")) || [],
      this.mockConnectedPeopleFetch.bind(this)
    );
  }
}

class StaticAppsProvider extends React.Component<
  {
    render: any;
  },
  {}
> {
  mockAppsFetch() {
    setTimeout(() => {
      window.localStorage.setItem("Topbar:Apps", JSON.stringify(apps));
      return this.forceUpdate();
    }, 1000);
  }

  componentDidMount() {
    if (!JSON.parse(window.localStorage.getItem("Topbar:Apps"))) {
      this.mockAppsFetch();
    }
  }

  render() {
    return this.props.render(
      JSON.parse(window.localStorage.getItem("Topbar:Apps")) || [],
      this.mockAppsFetch.bind(this)
    );
  }
}

class SampleTopbar extends React.Component<
  {
    userAvatarPath: string;
    userId: string;
    userName: string;
    orgName: string;
    platformNotifications?: object;
  },
  {}
> {
  render() {
    return (
      <StaticConnectedPeopleProvider
        render={(connectedPeople, fetchConnectedPeople) => (
          <StaticAppsProvider
            render={(apps, fetchApps) => (
              <div style={{ backgroundColor: shared.colors.base0 }}>
                <PlatformNotificationsStyle colors={shared.colors}>
                  <PlatformNotification>
                    <span>test</span>
                    <a href="#">
                      link
                    </a>
                  </PlatformNotification>

                  <PlatformNotificationsProvider
                    env={shared.env}
                    initialNotifications={staticPlatformNotifications}
                    render={(data, actions) => (
                      <PlatformNotificationsBar
                        colors={shared.colors}
                        notifications={data.notifications}
                        onDismiss={actions.dismissNotification}
                      />
                    )}
                  />
                </PlatformNotificationsStyle>

                <DisplaySwitch
                  smallTopbar={() => (
                    <div style={{ backgroundColor: shared.colors.base0 }}>
                      <SmallTopbar
                        {...shared}
                        {...staticData}
                        apps={apps}
                        connectedPeople={connectedPeople}
                        userAvatarPath={this.props.userAvatarPath}
                        userId={this.props.userId}
                        userName={this.props.userName}
                        orgName={this.props.orgName}
                        currentRouteComponent={({ style, ...props }) => (
                          <span
                            {...props}
                            style={{
                              ...style,
                              textShadow: `${shared.colors.base2} 0 1px 1px`
                            }}
                          />
                        )}
                        requestAppsFetch={fetchApps}
                        requestConnectedPeopleFetch={fetchConnectedPeople}
                        routes={staticData.routes.map(([name, uri]) => (
                          <SmallRoute
                            key={name}
                            href={uri}
                            active={name === staticData.activeRoute}
                          >
                            {name}
                          </SmallRoute>
                        ))}
                        notifications={() => (
                          <Notifications notifications={true} />
                        )}
                      />
                    </div>
                  )}
                  notSmallTopbar={activeBreakpoint => (
                    <NotSmallTopbar
                      {...shared}
                      {...staticData}
                      apps={apps}
                      connectedPeople={connectedPeople}
                      userAvatarPath={this.props.userAvatarPath}
                      userId={this.props.userId}
                      userName={this.props.userName}
                      orgName={this.props.orgName}
                      showOrgName={["xl"].indexOf(activeBreakpoint) !== -1}
                      requestAppsFetch={fetchApps}
                      linkToProfile={true}
                      requestConnectedPeopleFetch={fetchConnectedPeople}
                      routes={staticData.routes.map(([name, uri]) => (
                        <NotSmallRoute
                          colors={shared.colors}
                          key={name}
                          href={uri}
                          active={name === staticData.activeRoute}
                          style={{
                            textShadow: `${shared.colors.base2} 0 1px 1px`
                          }}
                        >
                          {name}
                        </NotSmallRoute>
                      ))}
                      notifications={() => (
                        <Notifications notifications={true} />
                      )}
                      search={({ hideRoutes, showRoutes }) => (
                        <Search onOpen={hideRoutes} onClose={showRoutes} />
                      )}
                    />
                  )}
                />
              </div>
            )}
          />
        )}
      />
    );
  }
}

const Notifications = ({ notifications = false, style = {}, ...props }) => (
  <a
    href="#"
    {...props}
    style={{
      display: "flex",
      height: "48px",
      alignItems: "center",
      paddingLeft: "16px",
      paddingRight: "16px",
      ...style
    }}
  >
    <BellIcon
      dot={notifications}
      fill={shared.colors.base3}
      stroke={shared.colors.base0}
    />
  </a>
);

class Search extends React.Component<
  { onOpen: any; onClose: any },
  { open: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  shouldComponentUpdate(_, nextState) {
    return this.state.open !== nextState.open;
  }

  componentDidUpdate() {
    this.state.open ? this.props.onOpen() : this.props.onClose();
  }

  render() {
    return (
      <div>
        {this.state.open ? (
          <button type="button" onClick={() => this.setState({ open: false })}>
            <XIcon />
          </button>
        ) : (
          <button type="button" onClick={() => this.setState({ open: true })}>
            <SpyglassIcon />
          </button>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <SampleTopbar
      userAvatarPath="https://avatars.planningcenteronline.com/uploads/person/5170951-1401820995/avatar.1.jpg"
      userId="1"
      userName="Juan Valdez"
      orgName="National Federation of Coffee National Federation of Coffee National Federation of Coffee"
      platformNotifications={staticPlatformNotifications}
    />
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra
      facilisis dolor vel viverra. Praesent viverra est id eros sollicitudin, id
      gravida nisl imperdiet. Nunc convallis ultrices posuere. Quisque augue
      velit, gravida et dui eget, consequat imperdiet sem. Vivamus id turpis
      laoreet arcu scelerisque cursus. Mauris tincidunt diam sed auctor
      interdum. Ut convallis turpis eget velit pretium vehicula. Vivamus at
      volutpat tellus, eu hendrerit leo. Morbi pharetra mauris mattis nisl
      laoreet tempor. Aliquam et sollicitudin ligula. Donec et nunc a dui
      scelerisque vestibulum sed sed lectus. Proin sed orci est. Pellentesque
      porta malesuada urna id imperdiet. Pellentesque pellentesque aliquet
      vestibulum. Pellentesque vehicula tincidunt nulla sed rutrum. Morbi
      condimentum pretium erat vel ullamcorper. Aliquam iaculis purus ut lectus
      egestas condimentum. Orci varius natoque penatibus et magnis dis
      parturient montes, nascetur ridiculus mus. In aliquam sagittis elit nec
      sagittis. Nullam vehicula nec odio sed lacinia. Cras porta mauris odio, a
      tincidunt nunc ullamcorper ac. Aenean dignissim faucibus arcu. Aenean nec
      egestas justo. Donec sodales rhoncus nunc, eu dictum quam placerat sit
      amet. Pellentesque nec enim mattis, venenatis lorem at, condimentum magna.
      Maecenas et condimentum eros. Donec vitae iaculis risus, vitae elementum
      augue. Donec lacinia mi sit amet eros porttitor porttitor. Cras dictum
      venenatis varius. Ut nisi urna, dapibus sed dolor id, dapibus feugiat
      turpis. Etiam molestie quam odio, ut volutpat erat tristique ullamcorper.
      Sed vitae congue dui, vel condimentum nisl. Phasellus rhoncus blandit
      tellus at viverra. Sed eu eros lectus. Fusce vitae dui dapibus, interdum
      nibh ac, scelerisque justo. Nunc vehicula massa justo, sit amet mattis
      lorem lacinia bibendum. Quisque nec leo sagittis, mollis nisl a, ultrices
      turpis. Nullam porta justo ac elit eleifend varius. Pellentesque venenatis
      arcu in feugiat euismod. Maecenas accumsan velit non gravida efficitur.
      Donec lacinia, lorem eu vehicula venenatis, neque dolor laoreet leo, ut
      convallis elit orci ut justo. Aliquam venenatis lacinia feugiat. Sed vel
      feugiat nisl. Nulla laoreet lectus sit amet nibh bibendum tincidunt.
      Vivamus quam odio, lacinia sit amet tempus non, interdum et nunc.
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia Curae; Nunc viverra nisi sed magna auctor elementum. Duis sapien
      nunc, elementum id arcu ac, suscipit elementum tellus. Cras consequat
      elementum nulla sit amet tincidunt. Fusce consectetur maximus varius.
      Vivamus ornare, eros sit amet pharetra blandit, risus nisi tempus est,
      vitae pharetra quam nunc sed nisl. Vestibulum ex massa, elementum vitae
      ultricies at, viverra nec magna. Donec aliquam augue quis dui suscipit, in
      iaculis ipsum accumsan. Phasellus scelerisque sagittis dapibus. Nullam
      convallis iaculis eleifend.
    </div>
  </div>,
  document.getElementById("app")
);
