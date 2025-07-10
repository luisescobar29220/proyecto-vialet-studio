package pe.idat.reserva.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import pe.idat.reserva.modelo.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
}
