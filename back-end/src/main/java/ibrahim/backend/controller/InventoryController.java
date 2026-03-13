package ibrahim.backend.controller;

import ibrahim.backend.dto.InventoryRequest;
import ibrahim.backend.dto.InventoryResponse;
import ibrahim.backend.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<InventoryResponse>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryResponse> getInventoryById(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.getInventoryById(id));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<InventoryResponse>> getInventoryByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getInventoryByProduct(productId));
    }

    @GetMapping("/warehouse/{warehouseId}")
    public ResponseEntity<List<InventoryResponse>> getInventoryByWarehouse(@PathVariable Long warehouseId) {
        return ResponseEntity.ok(inventoryService.getInventoryByWarehouse(warehouseId));
    }

    @PostMapping
    public ResponseEntity<InventoryResponse> createOrUpdateInventory(@Valid @RequestBody InventoryRequest request) {
        InventoryResponse result = inventoryService.createOrUpdateInventory(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }
}
