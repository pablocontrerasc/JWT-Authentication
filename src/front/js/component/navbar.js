import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>

				<div className="ml-auto">

				</div>
				<div className="ml-auto">

				{!store.token ?
							<Link to="/signup">
							<button className="btn btn-primary">Registrarse</button>
						</Link>
						:
						<Link to="/private">
						<button className="btn btn-primary">Informacion privada</button>
					</Link>


					}


					{!store.token ?
						<Link to="/login">
							<button className="btn mx-1">
								Iniciar Sesión
							</button>
						</Link>
						:
						<Link to="/">
							<button onClick={() => actions.logout()} className="btn mx-1" >Cerrar sesión</button>
						</Link>


					}
				</div>

			</div>
		</nav>
	);
};
