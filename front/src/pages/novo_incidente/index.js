import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import logo_img from '../../assets/logo.svg';
import api from '../../services/api';

export default function Novo_incidente() {
    const [titulo, set_titulo] = useState('');
    const [descricao, set_descricao] = useState('');
    const [valor, set_valor] = useState('');

    const id_ong = localStorage.getItem('id_ong');

    const historico = useHistory();

    async function criar_incidente(e) {
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            valor,
        };
        try {
            await api.post('incidentes', data, {
                headers: {
                    Authorization: id_ong,
                }
            });
            historico.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar o caso');
        }
    }

    return (
        <div className="novo-incidente-container">
            <div className="content">
                <section>
                    <img src={logo_img} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>descreva o caso</p>

                    <Link className='links' to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={criar_incidente}>
                    <input
                        placeholder="Titulo"
                        value={titulo}
                        onChange={e => set_titulo(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => set_descricao(e.target.value)}
                    />
                    <input
                        placeholder="Valor"
                        value={valor}
                        onChange={e => set_valor(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}