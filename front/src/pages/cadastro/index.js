import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './style.css';

import logo_img from '../../assets/logo.svg';

export default function Cadastro() {
    const [nome, set_nome] = useState('');
    const [email, set_email] = useState('');
    const [whatsapp, set_whatsapp] = useState('');
    const [cidade, set_cidade] = useState('');
    const [uf, set_uf] = useState('');

    const historico = useHistory();

    async function cadastrar(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        };

        try {
            const resposta = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${resposta.data.id}`);

            historico.push('/profile');
        } catch (err) {
            alert('Ocorreu um erro ao cadastrar');
        }
    }

    return (
        <div className="cadastro-container">
            <div className="content">
                <section>
                    <img src={logo_img} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu Cadastro</p>

                    <Link className='links' to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={cadastrar}>
                    <input
                        placeholder="Nome da ong"
                        value={nome}
                        onChange={e => set_nome(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => set_email(e.target.value)}
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => set_whatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e => set_cidade(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => set_uf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}