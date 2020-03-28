import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import './style.css';

import logo_img from '../../assets/logo.svg';

export default function Profile() {
    const [incidentes, set_incidentes] = useState([]);

    const nome_ong = localStorage.getItem('nome_ong');
    const id_ong = localStorage.getItem('id_ong');

    const historico = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: id_ong,
            }
        }).then(response => {
            set_incidentes(response.data);
        })
    }, [id_ong]);

    async function deletar_caso(id) {
        try {
            await api.delete(`/incidentes/${id}`, {
                headers: {
                    Authorization: id_ong,
                }
            });
            set_incidentes(incidentes.filter(incidentes => incidentes.id !== id));
        } catch (err) {
            alert('Erro ao Deletar');
        }
    }

    function logout() {
        localStorage.clear();
        historico.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo_img} alt="Be The Hero" />
                <span>Bem Vindo, {nome_ong}</span>
                <Link className="button" to="/incidentes/novo">Novo Caso</Link>
                <button type="button" onClick={logout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidentes.map(incidentes => (
                    <li key={incidentes.id}>
                        <strong>CASO:</strong>
                        <p>{incidentes.titulo}</p>

                        <strong>DESCRIÇÂO</strong>
                        <p>{incidentes.descricao}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidentes.valor)}</p>

                        <button type="button" onClick={() => deletar_caso(incidentes.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}