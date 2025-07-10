package pe.idat.reserva.service;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pe.idat.reserva.modelo.Reserva;
import pe.idat.reserva.repository.ReservaRepository;

@Service
@RequiredArgsConstructor
public class ReservaService {
    
    private final ReservaRepository reservaRepository;

    public List<Reserva> listaReservas(){
        return  reservaRepository.findAll();
    }

    public Optional<Reserva> buscarId(Long id){
        return reservaRepository.findById(id);
    }

    public Reserva guardarReserva (Reserva reserva){
        return reservaRepository.save(reserva);
    }

    public void eliminarReserva(Long id){
        reservaRepository.deleteById(id);
    }
    
     
}
