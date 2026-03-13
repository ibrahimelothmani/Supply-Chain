package ibrahim.backend.service;

import ibrahim.backend.dto.WarehouseRequest;
import ibrahim.backend.dto.WarehouseResponse;

import java.util.List;

public interface WarehouseService {

    List<WarehouseResponse> getAllWarehouses();

    WarehouseResponse getWarehouseById(Long id);

    WarehouseResponse createWarehouse(WarehouseRequest request);

    WarehouseResponse updateWarehouse(Long id, WarehouseRequest request);

    void deleteWarehouse(Long id);
}
