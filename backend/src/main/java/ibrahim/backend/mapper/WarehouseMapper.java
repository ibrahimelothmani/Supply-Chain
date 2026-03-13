package ibrahim.backend.mapper;

import ibrahim.backend.dto.WarehouseRequest;
import ibrahim.backend.dto.WarehouseResponse;
import ibrahim.backend.entity.Warehouse;
import org.springframework.stereotype.Component;

@Component
public class WarehouseMapper {

    public Warehouse toEntity(WarehouseRequest request) {
        Warehouse warehouse = new Warehouse();
        warehouse.setName(request.getName());
        warehouse.setLocation(request.getLocation());
        warehouse.setCapacity(request.getCapacity() != null ? request.getCapacity() : 0);
        return warehouse;
    }

    public WarehouseResponse toResponse(Warehouse warehouse) {
        return WarehouseResponse.builder()
                .id(warehouse.getId())
                .name(warehouse.getName())
                .location(warehouse.getLocation())
                .capacity(warehouse.getCapacity())
                .createdAt(warehouse.getCreatedAt())
                .build();
    }

    public void updateEntity(Warehouse warehouse, WarehouseRequest request) {
        warehouse.setName(request.getName());
        warehouse.setLocation(request.getLocation());
        if (request.getCapacity() != null) {
            warehouse.setCapacity(request.getCapacity());
        }
    }
}
