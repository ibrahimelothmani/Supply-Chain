package ibrahim.backend.service.Impl;

import ibrahim.backend.dto.WarehouseRequest;
import ibrahim.backend.dto.WarehouseResponse;
import ibrahim.backend.entity.Warehouse;
import ibrahim.backend.exception.ResourceNotFoundException;
import ibrahim.backend.mapper.WarehouseMapper;
import ibrahim.backend.repository.WarehouseRepository;
import ibrahim.backend.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final WarehouseMapper warehouseMapper;

    @Override
    public List<WarehouseResponse> getAllWarehouses() {
        return warehouseRepository.findAll()
                .stream()
                .map(warehouseMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public WarehouseResponse getWarehouseById(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse", id));
        return warehouseMapper.toResponse(warehouse);
    }

    @Override
    public WarehouseResponse createWarehouse(WarehouseRequest request) {
        Warehouse warehouse = warehouseMapper.toEntity(request);
        Warehouse savedWarehouse = warehouseRepository.save(warehouse);
        return warehouseMapper.toResponse(savedWarehouse);
    }

    @Override
    public WarehouseResponse updateWarehouse(Long id, WarehouseRequest request) {
        Warehouse existingWarehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse", id));
        warehouseMapper.updateEntity(existingWarehouse, request);
        Warehouse updatedWarehouse = warehouseRepository.save(existingWarehouse);
        return warehouseMapper.toResponse(updatedWarehouse);
    }

    @Override
    public void deleteWarehouse(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse", id));
        warehouseRepository.delete(warehouse);
    }
}
