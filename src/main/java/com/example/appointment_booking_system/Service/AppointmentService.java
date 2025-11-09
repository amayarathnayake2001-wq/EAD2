package com.example.appointment_booking_system.Service;

import com.example.appointment_booking_system.Repository.AppointmentRepo;
import com.example.appointment_booking_system.model.Appointment;
import com.example.appointment_booking_system.Repository.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepo appointmentRepo;
    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepo.save(appointment);
    }
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepo.findById(id);
    }
    public Appointment updateAppointment(Long id, Appointment newDetails) {
        return appointmentRepo.findById(id)
                .map(existing -> {
                    existing.setName(newDetails.getName());
                    existing.setEmail(newDetails.getEmail());
                    existing.setDate(newDetails.getDate());
                    existing.setTime(newDetails.getTime());
                    existing.setServiceType(newDetails.getServiceType());
                    return appointmentRepo.save(existing);
                }).orElse(null);
    }
    public void deleteAppointment(Long id) {
        appointmentRepo.deleteById(id);
    }
}
