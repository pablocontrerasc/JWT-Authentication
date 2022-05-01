const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				const store = getStore();
				const opciones = {
					headers: {
						Authorization: "Bearer " + store.token,
					},
				};
				fetch(`${process.env.BACKEND_URL}/api/hello`, opciones)
					.then((resp) => resp.json())
					.then((data) => setStore({ message: data.message }))

					.catch((error) =>
						console.log("Error loading message from backend", error)
					);

			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
				const opciones = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};
				try {
					const resp = await fetch(
						`${process.env.BACKEND_URL}/api/login`,
						opciones
					);
					if (resp.status !== 200) {
						throw new Error("ERROR en respuesta", Error);
					}
					const data = await resp.json();
					console.log("Informacion desde backend", data);
					sessionStorage.setItem("token", data.token);
					console.log(data, "accestoken")
					setStore({ token: data.token });
					return data;
				} catch (error) {
					console.error(`Login error: ${error}`);
				}
			},
			sincronizarTokenParaSessionStrore: () => {
				const token = sessionStorage.getItem("token");
				console.log("aplicacion sincronizada desde session Storage token");
				if (token && token != "" && token != undefined)
					setStore({ token: token });
			},

			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.clear();

				console.log("Cerrar sesion");
				setStore({ token: null });
				setStore({ message: null })
			},
			registrarse: async (email, password) => {
				const opciones = {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify({
					email: email,
					password: password
				  }),
				};
				try {
				  const resp = await fetch(
					`${process.env.BACKEND_URL}/api/singup`,
					opciones
				  );
				  if (resp.status != 200) {
					throw new Error("ERROR en respuesta", Error);
				  }
				  const data = await resp.json();
				  console.log("Informacion desde backend", data);
				  setStore({ data: data });
				  return data;
				} catch (error) {
				  console.error(`New user error: ${error}`);
				}
			  },
		}
	};
};

export default getState;
