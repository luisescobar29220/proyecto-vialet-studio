package pe.idat.reserva.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pe.idat.reserva.modelo.Cliente;

public interface  ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findByCorreoAndPassword(String correo, String password);
    boolean existsByCorreo(String correo);
}
