'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { Skeleton, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import Banner from '../components/Banner';
import CardDecada from '../components/CardDecada';

const HEADERS = { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY };

export default function CasosCriminais() {
    const [casos, setCasos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalInfo, setModalInfo] = useState({ visible: false, caso: null });

    useEffect(() => {
        const fetchCasos = async () => {
            try {
                const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/news/featured`,
                { headers: HEADERS }
            );
                setCasos(response.data.data || []);
            } catch (error) {
                toast.error('Erro ao carregar casos criminais');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCasos();
    }, []);

    return (
        <div>
            <Head>
                <title>Casos Criminais</title>
            </Head>

            <Banner title="CASOS CRIMINAIS" image="/images/image-casos.png" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', padding: '16px' }}>
                {loading ? (
                    <Skeleton active />
                ) : (
                    casos.map((caso) => (
                        <CardDecada
                            key={caso.id}
                            caso={caso}
                            onClick={() => setModalInfo({ visible: true, caso })}
                        />
                    ))
                )}
            </div>

            <Modal
                title={modalInfo.caso?.title}
                open={modalInfo.visible}
                onCancel={() => setModalInfo({ visible: false, caso: null })}
                footer={null}
                width={600}
            >
                {modalInfo.caso ? (
                    <div>
                        <p>{modalInfo.caso.text}</p>
                        <a
                            href={modalInfo.caso.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ler mais
                        </a>
                    </div>
                ) : (
                    <Skeleton active />
                )}
            </Modal>

            <ToastContainer position="top-right" autoClose={4500} />
        </div>
    );
}
