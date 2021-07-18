
import '@/App.less';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routers from '@/router/index.js'
import HeaderComponent from '@/layout/header';

class App extends React.Component {
	render () {
		return (
			<BrowserRouter>
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
												<header className="App-header">
													<HeaderComponent {...props} />
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
													{/* <UploadPage /> */}
												</header>
											</div>
										)
									}}
								/>
							)
						})
					}
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
