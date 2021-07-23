
import '@/App.less';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import routers from '@/router/index.js'
import HeaderComponent from '@/layout/header';
import { Layout, Menu, Breadcrumb, Badge } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, AlignRightOutlined, LogoutOutlined } from '@ant-design/icons';


const { SubMenu } = Menu
const { Header, Content, Sider } = Layout;

class App extends React.Component {
	render () {
		return (
			<HashRouter>
				<Switch>
					{
						routers.map((router, index) => {
							return (
								<Route
									key={index}
									exact={router.exact}
									path={router.path}
									render={(props) => {
										return (
											<div className="App">
												<Layout id="components-layout-demo-top-side-2">
													<Header className="header">
														<div className="app-header-icons">
															<div className="icon-class">
																<Badge count={89}>
																	<div>
																		<AlignRightOutlined />
																	</div>
																</Badge>
															</div>
															<Badge>
																<div className="icon-class">
																	<LogoutOutlined />
																</div>
															</Badge>
														</div>
													</Header>
													<Layout>
														<Sider collapsed={true} width={300} className="site-layout-background">
															<Menu
																mode="inline"
																style={{ height: '100%', borderRight: 0 }}
															>
																<Menu.Item icon={<UserOutlined />} key="1">Option1</Menu.Item>
																<Menu.Item icon={<LaptopOutlined />} key="2">Aption2</Menu.Item>
																<Menu.Item icon={<NotificationOutlined />} key="3">Bption3</Menu.Item>
															</Menu>
														</Sider>
														<Layout style={{ padding: '0 24px 24px' }}>
															<Breadcrumb style={{ margin: '16px 0' }}>
																<Breadcrumb.Item>Home</Breadcrumb.Item>
																<Breadcrumb.Item>List</Breadcrumb.Item>
																<Breadcrumb.Item>App</Breadcrumb.Item>
															</Breadcrumb>
															<HeaderComponent {...props} />
															<Content
																className="site-layout-background"
																style={{
																	padding: 24,
																	margin: 0,
																	minHeight: 280,
																}}
															>
																<div className="app-container">
																	<router.component {...props}>
																		{
																			router.children?.map((item, itemIndex) => {
																				return (
																					<Route
																						exact={item.exact}
																						key={itemIndex}
																						path={item.path}
																						component={item.component}
																					/>
																				)
																			})
																		}
																	</router.component>
																</div>
															</Content>
														</Layout>
													</Layout>
												</Layout>
											</div>
										)
									}}
								/>
							)
						})
					}
				</Switch>
			</HashRouter>
		)
	}
}

export default App;
