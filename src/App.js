import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import routers from '@/router/index.js'
import PrivateRoute from '@/router/private-router.js'


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
											<router.component {...props}>
												{
													router.children?.map((item, itemIndex) => {
														return (
															<PrivateRoute
																exact={item.exact}
																key={itemIndex}
																path={item.path}
																component={item.component}
															/>
														)
													})
												}
											</router.component>
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
