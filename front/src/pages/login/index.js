import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

import heroes_Img from '../../assets/heroes.png';
import logo_img from '../../assets/logo.svg';

export default function Login() {
    const [id, set_id] = useState('');
    const historico = useHistory();

    async function logar(e) {
        e.preventDefault();

        try {
            const resposta = await api.post('sessao', { id });

            localStorage.setItem('id_ong', id);
            localStorage.setItem('nome_ong', resposta.data.nome);

            historico.push('/profile');
        } catch (err) {

        }
    }

    return (
        <dir className="login-container">
            <section className='form'>
                <img src={logo_img} alt="Be The Heroe" />
                <form onSubmit={logar}>
                    <h1>Faça seu Login</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => set_id(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link className='links' to="/cadastro">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroes_Img} alt="Heroes" />
        </dir>
    );
}