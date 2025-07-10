package pe.idat.reserva.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import pe.idat.reserva.modelo.Reserva;
import pe.idat.reserva.service.ReservaService;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "http://127.0.0.1:5501")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;

    // Endpoint para listar todas las reservas
    @GetMapping
    public List<Reserva> listaReservas() {
        return reservaService.listaReservas();
    }

    // Endpoint para obtener una reserva por ID
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> obtenerReserva(@PathVariable("id") Long id) {
        return reservaService.buscarId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para crear una nueva reserva
    @PostMapping
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva) {
        try {
            Reserva nuevaReserva = reservaService.guardarReserva(reserva);
            return new ResponseEntity<>(nuevaReserva, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint para actualizar una reserva existente
    @PutMapping("/{id}")
    public ResponseEntity<Reserva> actualizarReserva(@PathVariable("id") Long id, @RequestBody Reserva reservaActualizada) {
        return reservaService.buscarId(id)
                .map(reservaExistente -> {
                    reservaExistente.setCliente(reservaActualizada.getCliente());
                    reservaExistente.setTipoServicio(reservaActualizada.getTipoServicio());
                    reservaExistente.setRangoHora(reservaActualizada.getRangoHora());
                    reservaExistente.setFecha(reservaActualizada.getFecha());
                    Reserva reservaGuardada = reservaService.guardarReserva(reservaExistente);
                    return ResponseEntity.ok(reservaGuardada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para eliminar una reserva
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReserva(@PathVariable("id") Long id) {
        reservaService.eliminarReserva(id);
        return ResponseEntity.noContent().build();
    }

    
}