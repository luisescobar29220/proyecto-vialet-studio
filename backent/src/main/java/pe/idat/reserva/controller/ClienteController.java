package pe.idat.reserva.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
import pe.idat.reserva.modelo.Cliente;
import pe.idat.reserva.modelo.Dto.ClienteLoginDto;
import pe.idat.reserva.service.ClienteService;

@RestController
@RequestMapping("/cliente")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class ClienteController {
    
    private final ClienteService clienteService;


    //todos los clientes
    @GetMapping
    public List<Cliente> listarClientes(){
        return clienteService.listarClientes();
    }

    //crear cliente
    @PostMapping
    public ResponseEntity<Cliente> creaCliente(@RequestBody Cliente cliente){
        Cliente newCliente = clienteService.crearCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCliente);
    }

    //obtener cliente por id
    @GetMapping("/{id}")
    public Optional<Cliente> obtenerClienteEntity(@PathVariable Long id){
        return  clienteService.buscarId(id);
    }

    //eliminar cliente
    @DeleteMapping("/{id}")
    public void eliminarUsers(@PathVariable Long id){
         clienteService.eliminarCliente(id);
    }

    //actualizar cliente
    @PutMapping("/{id}")
    public Cliente actualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente){
        Cliente clienteActualizado = clienteService.actualizarCliente(id, cliente);
        return clienteActualizado;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody ClienteLoginDto clienteLoginDto) {
    Map<String, Object> response = new HashMap<>();
    try {
        // Validar las credenciales
        Cliente cliente = clienteService.validarCorreYPassword(clienteLoginDto);
        
        // Construir la respuesta
        response.put("success", true);
        response.put("message", "Inicio de sesión exitoso.");
        response.put("nombre", cliente.getNombres()); // Agregar solo el nombre del cliente
        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException ex) {
        // Manejo de errores
        response.put("success", false);
        response.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}

    

}
