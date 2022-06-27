export default {
	translations: {
		home: {
			message: 'Olá Mundo!'
		},
		error: {
			genericTitle: 'Oops!',
			retry: 'TENTAR NOVAMENTE'
		},
		loading: 'carregando..',
		auth: {
			login: {
				left: {
					title: 'Welcome to the dinvest!',
					subtitle: 'You can do this, I believe in you.'
				},
				right: {
					title: 'Welcome to the dinvest!',
					subtitle: 'Ainda não tem conta? Entre <1>aqui</1> e crie a sua conta!'
				},
				form: {
					email: {
						label: 'Email',
						placeholder: 'digite seu email',
						description: '',
						errors: {
							required: 'email não pode ser vazio',
							invalid: 'email inválido'
						}
					},
					password: {
						label: 'Senha',
						placeholder: 'digite sua senha',
						description: '',
						errors: {
							required: 'senha não pode ser vazia',
							invalid: 'senha inválida'
						}
					},
					recovery: {
						label: 'Esqueci a minha senha'
					},
					button: {
						label: 'ENTRAR'
					},
					errors: {
						notFound: 'Email ou senha errada'
					}
				}
			},
			signup: {
				left: {
					title: 'Welcome to the dinvest!',
					subtitle: 'You can do this, I believe in you.'
				},
				right: {
					title: 'Welcome to the dinvest!',
					subtitle: 'Já tem conta? Então entre <1>aqui</1> pra fazer login!'
				},
				form: {
					name: {
						label: 'Nome',
						placeholder: 'digite seu nome',
						description: '',
						errors: {
							required: 'nome é obrigatório'
						}
					},
					email: {
						label: 'Email',
						placeholder: 'digite seu email',
						description: '',
						errors: {
							required: 'email é obrigatório',
							invalid: 'email inválido'
						}
					},
					password: {
						label: 'Senha',
						placeholder: 'digite sua senha',
						description: '',
						errors: {
							required: 'senha é obrigatória',
							invalid: 'senha inválida'
						}
					},
					repeatPass: {
						label: 'Repita sua senha',
						placeholder: 'digite sua senha outra vez',
						description:
							'Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número',
						errors: {
							required: 'senha é obrigatória',
							invalid: 'senha inválida',
							notMatching: 'senhas não são iguais'
						}
					},
					button: {
						label: 'CRIAR CONTA'
					}
				},
				errors: {
					hasAccount: 'Já existe um usuário associado a este email.'
				}
			}
		},
		errors: {
			unknown: 'Ocorreu um erro. Por favor, tente novamente mais tarde!'
		}
	}
};
