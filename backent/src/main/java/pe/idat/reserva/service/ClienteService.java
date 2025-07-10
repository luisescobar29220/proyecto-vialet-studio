package pe.idat.reserva.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pe.idat.reserva.modelo.Cliente;
import pe.idat.reserva.modelo.Dto.ClienteLoginDto;
import pe.idat.reserva.repository.ClienteRepository;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    //buscar todos los cliente
    public List<Cliente> listarClientes(){
        return clienteRepository.findAll();
    }

    //buscar cliente ID
    public Optional<Cliente> buscarId(Long id){
        return  clienteRepository.findById(id);
    }
    
    //crear cliente
    public Cliente crearCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }
    //eliminar cliente
    public void eliminarCliente(Long id){
        clienteRepository.deleteById(id);
    }
    
    //actualizar cliente
    public Cliente actualizarCliente(Long id, Cliente cliente){
        Optional<Cliente> clienteObtenido = this.buscarId(id);
        if(clienteObtenido.isPresent()){
            return clienteRepository.save(cliente);
        }
        return null;
    }

    // Validar correo y contraseña
    public Cliente validarCorreYPassword(ClienteLoginDto clienteLoginDto) {
        // Validar que los campos no sean nulos ni vacíos
        if (clienteLoginDto.getCorreo() == null || clienteLoginDto.getCorreo().isEmpty()) {
            throw new IllegalArgumentException("El correo es obligatorio.");
        }
        if (clienteLoginDto.getPassword() == null || clienteLoginDto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("La contraseña es obligatoria.");
        }

        // Buscar cliente en el repositorio
        return clienteRepository.findByCorreoAndPassword(clienteLoginDto.getCorreo(), clienteLoginDto.getPassword())
                .orElseThrow(() -> new IllegalArgumentException("Correo o contraseña incorrectos."));
    }

    


}
