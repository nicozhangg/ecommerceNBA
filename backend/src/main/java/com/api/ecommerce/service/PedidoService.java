package com.api.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.api.ecommerce.model.Pedido;
import com.api.ecommerce.repository.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido guardarPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }
}